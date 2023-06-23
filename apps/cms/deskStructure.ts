import { CogIcon } from "@sanity/icons";
import { StructureBuilder } from "sanity/desk";

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')),
            ...S.documentTypeListItems().filter(listItem => !['settings'].includes(listItem.getId() || ''))
    ])
