import { Response, Request } from "express";
import { Product, ProductDocument } from "../models/Product";
import {
  paginator,
  paginatorInfoGenerator,
  paginatorValidation,
} from "../utils/pagination";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const paginateEvaluation = await paginatorValidation(req);
    if (!paginateEvaluation.valid) {
      res.status(422).jsonp(paginateEvaluation.errors);
      return;
    }
    const productTotalCount: number = paginateEvaluation.paginate
      ? await Product.countDocuments()
      : 0;
    const paginationInfo = paginatorInfoGenerator({
      paginate: paginateEvaluation.paginate,
      pageNo: paginateEvaluation.pageNo,
      pageSize: paginateEvaluation.pageSize,
      total: productTotalCount,
    });

    const productsQuery = paginator<ProductDocument>(
      Product.find().populate("plant"),
      productTotalCount,
      paginateEvaluation
    );

    const products = await productsQuery.exec();

    res
      .status(200)
      .json({ products, ...(paginationInfo && { paginationInfo }) });
  } catch (err) {
    res.status(404).send(err.message);
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const person = new Product(req.body);
    const result = await person.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
