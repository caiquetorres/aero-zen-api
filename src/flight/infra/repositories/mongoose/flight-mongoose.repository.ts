import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { IPageQuery } from '../../../../core/domain/interfaces/page-query.interface';
import { IPage } from '../../../../core/domain/interfaces/page.interface';
import { IFlight } from '../../../domain/interfaces/flight.interface';
import { Flight } from '../../../domain/models/flight';

import { FlightRepository } from '../flight.repository';
import { FlightMongooseMapper } from './flight-mongoose.mapper';
import { FlightDocument } from './flight.schema';

@Injectable()
export class FlightMongooseRepository implements FlightRepository {
  constructor(
    @InjectModel(FlightDocument.name)
    private readonly _model: Model<FlightDocument>,
  ) {}

  async save(flight: IFlight): Promise<Result<Flight>> {
    const document = FlightMongooseMapper.toDocument(flight);

    if (document.isNone()) {
      return err(new Error('Null flight domain'));
    }

    const { _id } = document.value;

    try {
      await this._model.updateOne({ _id }, document.value, { upsert: true });
      return this._model
        .findById(_id)
        .lean()
        .then((document) => FlightMongooseMapper.toDomain(document))
        .then((domain) => ok(domain.unwrap()));
    } catch (error: any) {
      return err(error);
    }
  }

  async findOneById(id: string | Types.ObjectId): Promise<Option<Flight>> {
    return this._model
      .findById(id)
      .lean()
      .then((document) => FlightMongooseMapper.toDomain(document));
  }

  async findMany(query: IPageQuery): Promise<IPage<Flight>> {
    const { limit, page } = query;
    const skip = (page - 1) * limit;
    const totalCount = await this._model.countDocuments().exec();
    const hasNextPage = skip + limit < totalCount;

    const bugReports = await this._model
      .find()
      .skip(skip)
      .limit(limit)
      .then((documents) =>
        documents.map((doc) => FlightMongooseMapper.toDomain(doc).unwrap()),
      );

    return { limit, page, hasNextPage, data: bugReports };
  }

  async deleteOne(user: IFlight): Promise<Result<void, Error>> {
    return this._model
      .deleteOne({ _id: new Types.ObjectId(user.id.unwrap()) })
      .then(() => ok(undefined))
      .catch((error) => err(error));
  }
}
