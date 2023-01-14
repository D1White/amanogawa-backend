import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group, GroupDocument } from 'schemas/group.schema';

import { CreateGroupDto, UpdateGroupDto } from './dto';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group.name) public groupModel: Model<GroupDocument>) {}

  async findAll() {
    return this.groupModel.find().exec();
  }

  async create(createGroupDto: CreateGroupDto) {
    const createdGroup = new this.groupModel(createGroupDto);
    return createdGroup.save();
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    return this.groupModel.findByIdAndUpdate(id, updateGroupDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.groupModel.findByIdAndDelete(id);
  }
}
