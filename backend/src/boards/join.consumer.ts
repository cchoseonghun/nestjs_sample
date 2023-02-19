import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { BoardsService } from "./boards.service";

@Processor('joinQueue')
export class JoinConsumer {
  constructor(private readonly boardsService: BoardsService) {}

  @Process('join')
  async getJoinQueue(job: Job) {
    await this.boardsService.joinGroup(job.data.boardId, job.data.userId);
  }
}