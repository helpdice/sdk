import { getUrl } from "../config/route.js";
import { get } from "../config/axios.js";

const Content  = {
  article: (slug: string) => get(getUrl('cms', 'v1', 'article'), {
    params: {
      slug
    }
  }),
  articles: (config?: object | undefined) => get(getUrl('cms', 'v1', 'articles'), config),
  articleCategories: (config?: object | undefined) => get(getUrl('cms', 'v1', 'articleCategories'), config),
  mcq: (slug: string) => get(getUrl('cms', 'v1', 'mcq'), {
    params: {
      slug
    }
  }),
  mcqs: (config?: object | undefined) => get(getUrl('cms', 'v1', 'mcqs'), config),
  mcqsCategories: (config?: object | undefined) => get(getUrl('cms', 'v1', 'mcqCategories'), config),
  qna: (slug: string) => get(getUrl('cms', 'v1', 'qna'), {
    params: {
      slug
    }
  }),
  qnas: (config?: object | undefined) => get(getUrl('cms', 'v1', 'qnas'), config),
  qnasCategories: (config?: object | undefined) => get(getUrl('cms', 'v1', 'qnaCategories'), config)
}

export default Content;
