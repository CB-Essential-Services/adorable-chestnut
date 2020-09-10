const env = process.env.NODE_ENV || 'development'

  const baseUrl = env === 'development' ? 'http://localhost:8000' : ''

  export default function PreviewURL(document) {
    switch (document._type) {
      case 'page': return `${baseURL}/${document.slug.current}`;
      case 'post': return `${baseURL}/post/${document.id}`;
      case 'author': return `${baseURL}/info/people/${document.slug.current}`;
      default: return baseURL;
    }
  }