import { defineType } from "sanity";

export const richTextDescriptionSchema = defineType({
  name: "richTextDescription",
  title: "Rich Text Description",
  type: 'array', 
  of: [{type: 'block', styles: [{title: 'Normal', value: 'normal'}], lists: [], marks: 
  {decorators: [{ "title": "Strong", "value": "strong" },
{ "title": "Emphasis", "value": "em" },
{ "title": "Code", "value": "code" },
{ "title": "Underline", "value": "underline" },
{ "title": "Strike", "value": "strike-through" }], annotations: [{
  type: 'object',
  name: 'link',
  options: {
    modal: {type: 'popover'},
  },
  fields: [
    {
      name: 'href',
      type: 'url',
      title: 'Url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'tel', 'mailto'],
          allowRelative: true,
        }),
    },
  ],
}]}}]
})