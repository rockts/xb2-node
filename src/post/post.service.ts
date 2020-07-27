import { connection } from '../app/database/mysql';
import { PostModel } from './post.model';
import { connect } from 'http2';
/**
 * 获取内容列表
 */
export const getPosts = async () => {
  const statement = `
    SELECT
      post.id,
      post.title,
      post.content,
      JSON_OBJECT(
        'id', user.id,
        'name', user.name
      ) as user
    FROM post
    LEFT JOIN user
      ON user.id = post.userId
  `;

  const [data] = await connection.promise().query(statement);

  return data;
};

/**
 * 创建内容
 */
export const createPost = async (post: PostModel) => {
  // 准备查询
  const statement = `
  INSERT INTO post
  SET ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, post);

  // 提供查询
  return data;
};

/**
 * 更新内容
 */
export const updatePost = async (postId: number, post: PostModel) => {
  // 准备查询
  const statemennt = `
    UPDATE post
    SET ?
    WHERE id = ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statemennt, [post, postId]);

  // 提供数据
  return data;
};
