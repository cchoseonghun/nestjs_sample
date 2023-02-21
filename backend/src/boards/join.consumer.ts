import { OnQueueError, OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { BoardsService } from "./boards.service";

@Processor('joinQueue')
export class JoinConsumer {
  constructor(private readonly boardsService: BoardsService) {}

  @OnQueueFailed()
  failHandler(job: Job, err: Error) {
    console.log('OnQueueFailed');
    throw err;
  }

  @OnQueueError()
  errorHandler(err: Error) {
    console.log('OnQueueError');
    throw err;
  }

  @Process('join')
  async getJoinQueue(job: Job) {
    return await this.boardsService.joinGroup(job.data.boardId, job.data.userId);
  }
}