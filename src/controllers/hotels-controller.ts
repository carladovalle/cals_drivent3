import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const hotels = await hotelsService.listHotels(userId);

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getRooms(req: AuthenticatedRequest, res: Response) {
  const hotelId = Number(req.params.hotelId);
  const { userId } = req;

  if (!hotelId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const rooms = await hotelsService.listRooms(userId, hotelId);

    return res.status(httpStatus.OK).send(rooms);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}