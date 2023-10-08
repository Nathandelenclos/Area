import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  AppletRelations,
  AppletService,
} from '@app/common/applets/applet.service';
import { AppletCreateDto } from '@app/common/applets/applet.dto';
import { DeepPartial } from 'typeorm';
import { UserEntity } from '@app/common/users/user.entity';
import { ReactionService } from '@app/common/reactions/reaction.service';
import { ReactionEntity } from '@app/common/reactions/reaction.entity';

@Controller('applets')
export class AppletController {
  constructor(
    private readonly appletService: AppletService,
    private readonly reactionService: ReactionService,
  ) {}

  @Get(':id')
  async findById(@Param('id') id: number, @Res() res: Response) {
    const response = await this.appletService.findOne({ id: id }, [
      AppletRelations.CONFIG,
      AppletRelations.ACTION,
      AppletRelations.REACTIONS,
      AppletRelations.USER,
    ]);
    res.status(200).json(response);
  }

  @Post()
  async create(
    @Body() data: AppletCreateDto,
    @Res() res: Response,
    @Req() req: { user: { id: number } },
  ) {
    try {
      const reactions = await this.reactionService.findAll();
      reactions.forEach((reaction) => {
        if (
          data.reactions.includes(reaction.id as DeepPartial<ReactionEntity>)
        ) {
          reaction.applets = [
            ...reaction.applets,
            data as DeepPartial<AppletCreateDto>,
          ];
        }
      });
      const response = await this.appletService.create(
        data,
        (data.user || req.user.id) as DeepPartial<UserEntity>,
        data.reactions || [],
        data.action,
      );
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}
