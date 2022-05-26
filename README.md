Getting started

1.
Install Chrome Driver: `brew install chromedriver`
Or update existing: `brew upgrade chromedriver`

2.
On th Mac you may need to give system permissions by running: `xattr -d com.apple.quarantine $(which chromedriver)`

3.
Create `.env` file by copy and update `.env.example`

4. 
Run server `npm start`

5.
The api route has format `/[yearn]/[month]` for instance: http://localhost:3000/2022/5

Enjoy!
