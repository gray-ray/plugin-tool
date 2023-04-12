const modules = require.context('./WorkCards', false, /\.tsx$/);

const moduleList = [];
const moduleObject = {};

function importAll(files) {
  files.keys().forEach(async (key) => {
    moduleObject[key.replace(/(\.\/|\.tsx)/g, '')] = await files(key);
    const obj = {
      name: key.replace(/(\.\/|\.tsx)/g, ''),
      ...(await files(key)),
    };
    moduleList?.push(obj);
  });
}

importAll(require.context('./WorkCards', false, /\.tsx$/));

export default {
  moduleList,
  moduleObject,
};
