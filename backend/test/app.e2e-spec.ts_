import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('NestJS API prac project');
  });

  describe('/boards', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/boards')
        .expect(200)
        .expect([
          {
            id: 1,
            title: 'title 1',
            content: 'content 1',
            author: 'author 1',
          },
        ]);
    });
    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/boards')
        .send({
          title: 'title',
          content: 'content',
          author: 'author',
        })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/boards')
        .send({
          wrong: 'wrong',
        })
        .expect(400);
    });
  });

  describe('/boards/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/boards/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/boards/999').expect(404);
    });
  });
});
