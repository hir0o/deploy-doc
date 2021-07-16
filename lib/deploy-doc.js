"use babel";

import fs from "fs";

const docPath = "/Users/shibuyahiroyuki/Desktop/my-website/docs";

const deploy = async () => {
  const db = inkdrop.main.dataStore.getLocalDB();
  const tags = db.tags;
  const notes = db.notes;
  const books = db.books;

  // tag idの取得
  const publicTagId = await tags
    .findWithName("public")
    .then((res) => {
      return res._id;
    })
    .catch((err) => {
      console.error(err);
    });

  // 公開するdocの取得
  const publicDocs = await notes
    .findWithTag(publicTagId)
    .then((res) => {
      return res.docs;
    })
    .catch((err) => {
      console.error(err);
    });

  publicDocs.forEach(async (docs) => {
    const bookId = docs.bookId;
    const book = await books
      .get(bookId)
      .then((res) => res)
      .catch((err) => console.error(err));

    const dir = `${docPath}/${book.name}`;

    // ディレクトリがなければ作成
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // TODO: 階層を作る
    // TODO: mapを作成
    // 最新のmapと比較して，存在しないファイルがあったら削除する

    fs.writeFileSync(`${dir}/${docs.title}.md`, docs.body, "utf-8", (err) => {
      if (err) {
        console.log(err);
      }
    });
  });

  console.log(publicDocs);
};

module.exports = {
  async activate() {
    deploy();
    inkdrop.commands.add(document.body, {
      "deploy-doc:deploy": () => deploy(),
    });
  },

  deactivate() {},
};
