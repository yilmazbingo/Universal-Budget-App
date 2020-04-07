# Universal-Budget-App
### Enzyme

With enzyme 3 we need an adapter. Adapter allows us to specify exactly which version of react we are gonna test against. This allows core enzyme library to be smaller. It does not need to have all of the code for all of the various versions of react that supported. Instead we just specify which one we need by installing the adapter that keeps the core library light and keeps your entire code base more manageable. 

   We also need to install a polyfill module. Polyfill is known as request animation frame. Since we do not have it in the test environment, we need to install it. Otherwise it will cause issues. 
  
         npm i --save-dev enzyme enzyme-adapter-react-16 raf
         
   
- Create setupTest.js directory in the tests folder to configure the test environment.
- Next, create jest.config.json on the root of app. This will allow us to specify that setupTest file should run because it is not in a special location with a special name. 

       {
       "setupFiles":[
           "raf/polyfill",
           "<rootDir>/src/tests/setupTests.js"]}
    
  Now inside the package.json we need to tell jest the destination of this file.
   
      "test": "jest --config=jest.config.json --watchAll"
    
 - We need to install enzyme-to-json. it allows us get back the snaphsot as json. So we can see it.
 - We need to move -moduleNameMapper- setting from package.json to this config file. 
 - Also load the enzyme-to-json here, so we will not need to import this in our each testing file.
 
         //jets.config.js

         {
          "setupFiles": ["raf/polyfill", "<rootDir>/src/tests/setupTest.js"],
          "snapshotSerializers": ["enzyme-to-json/serializer"],
          "moduleNameMapper": {
            "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
            "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
          }
        }

   
 
      
  



