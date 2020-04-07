# Universal-Budget-App

- create /test directory in the root, install jest, react-test-renderer, identity-obj-proxy packages.
- test data should be in /text/fixtures/expenses.js

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
        
###   SNAPSHOT TESTING

  We have to virtually render our component. We need to figure out what jsx comes back but we are not going to be viewing in the browser. We are going to be accessing it via the code. Install [react-test-renderer](https://www.npmjs.com/package/react-test-renderer) but this is for simple components.
  
  We have to find a way to test react components. We are not worried about user interaction or lifecycle events. We are just concerned about what’s getting rendered and shallow rendering does just that.
  
  Snapshots allow us to track changes to data over time. We are going to be able to create a snapshot of our component at its current point in time and we are going to be able to get notified if this ever changes. So if the header output does change in a way we do not want we can catch that.

            test("should render Header correctly", () => {
             const renderer = new ShallowRenderer();
             renderer.render(<Header />);
             expect(renderer.getRenderOutput()).toMatchSnapshot()
             console.log(renderer.getRenderOutput());});

   First time when we render this test case, it will pass because there is no existing snapshot. so jest gonna create a snapshot of what the rendered Header output looked like. Second time we run this test case, jest will compare it with the existing snapshot. if it is the same, test will pass.
   
   This also will create __snapshot__ directory in the tests dir. Our snapshots are stored here.

   If you change your component after the snapshot is created, the test will fail. You can either accept this change or decline it


