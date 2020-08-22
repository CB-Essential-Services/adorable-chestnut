import S from "@sanity/desk-tool/structure-builder";

// Simple example of web preview
const url = 'http://localhost:8000/';
const WebPreview = ({document}) => {
  const {displayed} = document
  return (
    <iframe 
      src={url + displayed.slug.current} 
      frameBorder={0} 
    />
  )
}

export const getDefaultDocumentNode = ({schemaType}) => {
 // Conditionally return a different configuration based on the schema type
 if (schemaType === "project") {
   return S.document().views([
     S.view.form(),
     S.view.component(WebPreview).title('Web')
   ])  
 }
}

export default S.defaults()
