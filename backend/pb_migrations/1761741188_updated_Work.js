/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3564216334")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "file83635035",
    "maxSelect": 99,
    "maxSize": 50,
    "mimeTypes": [],
    "name": "Image",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3564216334")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "file83635035",
    "maxSelect": 99,
    "maxSize": 10,
    "mimeTypes": [],
    "name": "Image",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
})
