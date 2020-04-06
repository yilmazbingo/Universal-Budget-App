# Universal-Budget-App

- create /test directory in the root, install jest, react-test-renderer, identity-obj-proxy packages.

      expect(result).toBe('value') //string,number,boolean
      expect(result).toEqual(object or array)

- since I install css files, jest will not be able to parse css. here is the setting
    -Create __mocks__ folder in root directory.
    - __mocks__/styleMock.js`
         
              module.exports = 
      
    -__mocks__/fileMock.js

            module.exports = 'test-file-stub';
           
add this configuration to package.json

      "jest":{
              "moduleNameMapper":{
                   "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
                   "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
              }
         }
         
   If we wanna add scss later:
   
          "jest":{
           "moduleNameMapper": {
            "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
            "\\.(css|less|scss|sass)$": "identity-obj-proxy"
          },
        }
