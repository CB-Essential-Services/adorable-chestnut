import React from 'react';
import S from "@sanity/desk-tool/structure-builder";
import EyeIcon from 'part:@sanity/base/eye-icon';
import EditIcon from 'part:@sanity/base/edit-icon';
import PreviewIFrame from './src/components/previewIFrame'

// Web preview configuration
const remoteURL = 'https://adorable-chestnut-master-6453652837.gtsb.io/'
const localURL = 'http://localhost:8000'
const previewURL = window.location.hostname === 'localhost' ? localURL : remoteURL

export const getDefaultDocumentNode = ({schemaType}) => {
 // Conditionally return a different configuration based on the schema type
 if (schemaType === "post") {
   return S.document().views([
    S.view.form().icon(EditIcon),
    S.view.component(PreviewIFrame)
      .options({previewURL})
      .title('Web Preview')
      .icon(EyeIcon),
   ])  
 }
}

export default S.defaults()
