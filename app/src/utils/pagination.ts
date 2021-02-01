import { Request } from "express";
import { param, query, validationResult } from "express-validator";
import { Query, Types } from "mongoose";

export interface Paginator {
  cursor: number;
  pageSize: number;
  currentPage: number;
  pages: number;
  isLastPage: boolean;
}

export interface PaginatorEvaluation {
  errors: string[];
  pageNo: number;
  pageSize: number;
  paginate: boolean;
  valid: boolean;
}

export const paginatorInfoGenerator = ({
  pageNo,
  pageSize,
  total,
  paginate,
}: {
  pageNo: number;
  pageSize: number;
  total: number;
  paginate: boolean;
}): Paginator | null => {
  if (!paginate) return null;
  const totalPage = totalPages({ total, pageSize });
  const evaluatedPageNo = pageNo > totalPage ? totalPage : pageNo;
  return {
    cursor: pageSize * evaluatedPageNo - pageSize,
    pageSize,
    currentPage: evaluatedPageNo,
    pages: totalPages({ total, pageSize }),
    isLastPage: isLastPage({ total, pageSize, pageNo: evaluatedPageNo }),
  };
};

export const paginatorValidation = async (
  req: Request
): Promise<PaginatorEvaluation> => {
  await query("pageNo", "PageNo required and bigger than 1 if pageSize")
    .if(query("pageSize").exists())
    .isInt({ gt: 0 })
    .run(req);
  await query("pageSize", "PageSize required and bigger than 1 pageNo")
    .if(query("pageNo").exists())
    .isInt({ gt: 0, lt: 101 })
    .run(req);
  const errors = validationResult(req);
  const pageNo = parseInt(req.query.pageNo as string);
  const pageSize = parseInt(req.query.pageSize as string);

  if (!errors.isEmpty())
    return {
      errors: errors.array().map((er) => er.msg as string),
      pageNo: NaN,
      pageSize: NaN,
      paginate: false,
      valid: false,
    };

  if (isNaN(pageNo) || isNaN(pageSize))
    return {
      errors: [],
      pageNo: NaN,
      pageSize: NaN,
      paginate: false,
      valid: true,
    };

  return { errors: [], pageNo, pageSize, paginate: true, valid: true };
};

export const paginator = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: Query<Array<T>, any, T>,
  total: number,
  { paginate, pageSize, pageNo }: PaginatorEvaluation
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
Query<Array<T>, any, T> => {
  if (!paginate) return query.limit(100);

  const totalPage = totalPages({ total, pageSize });
  const evaluatedPageNo = pageNo > totalPage ? totalPage : pageNo;
  const cursor = pageSize * evaluatedPageNo - pageSize;

  return query.skip(cursor).limit(pageSize);
};

const totalPages = ({
  total,
  pageSize,
}: {
  total: number;
  pageSize: number;
}): number => Math.ceil(total / pageSize);

const isLastPage = ({
  total,
  pageSize,
  pageNo,
}: {
  total: number;
  pageSize: number;
  pageNo: number;
}) => pageNo >= totalPages({ total, pageSize });
