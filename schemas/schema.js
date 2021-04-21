// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      title: "Постууд",
      name: "post",
      type: "document",
      fields: [
        {
          title: "Постын гарчиг",
          name: "title",
          type: "string",
          description:
            "Блогийн постын үндсэн гарчиг, 50 тэмдэгтээс бүү хэтрүүлээрэй",
          validation: (Rule) => [
            Rule.required()
              .min(10)
              .error("Гарчиг хамгийн багдаа 10 тэмдэгт байна"),
            Rule.max(50).warning("Гарчигийн нийт тэмдэгтийн урт 50"),
          ],
        },
        {
          title: "Дэд гарчиг",
          name: "subtitle",
          type: "string",
          description: "Постын төрөл текстээр бичнэ үү",
        },
        {
          title: "Нийтлэлч",
          name: "publisher",
          type: "reference",
          to: [{ type: "publisher" }],
        },
        {
          title: "Постын зураг",
          name: "cover_image",
          type: "image",
        },
        {
          name: "content",
          type: "array",
          title: "Постын агуулга",
          of: [
            {
              type: "block",
            },
            {
              type: "image",
            },
            {
              type: "code",
            },
          ],
        },
        {
          title: "Огноо",
          name: "date",
          type: "datetime",
        },
        {
          title: "Хаяг",
          name: "slug",
          type: "slug",
          options: {
            source: "title",
            maxLength: 200, // will be ignored if slugify is set
            slugify: (input) =>
              input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
          },
        },
      ],
    },
    {
      title: "Нийтлэгч",
      name: "publisher",
      type: "document",
      fields: [
        {
          title: "Нийтлэгчийн нэр",
          name: "title",
          type: "string",
        },
        {
          title: "Нийтлэгчийн зураг",
          name: "picture",
          type: "image",
        },
      ],
    },
  ]),
});
