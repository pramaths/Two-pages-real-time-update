const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
//require('./swagger')(app);
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "Library API",
        version: '1.0.0',
      },
    },
    apis: ["server.js"],
  };
  
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));





let storedData = null; 
/**
 * @swagger
 * /api/submit:
 *   post:
 *     description: Getting data from html page
 *     parameters:
 *      - name: checkbox
 *        in: formData
 *        description: Checkbox name with number
 *        required: true
 *        schema:
 *          type: string
 *      - name: textbox
 *        in: formData
 *        description: Text from the textbox
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       '201':
 *         description: Data received successfully
 *       '400':
 *         description: Bad Request
 */
app.post('/api/submit', (req, res) => {
  const data = req.body;
  console.log(data);

  if (data && Object.keys(data).length > 0) {
    storedData = data; 
  }
  
  res.json({ message: 'Data received successfully' });
});


/**
 * @swagger
 * /api/data:
 *   get:
 *     description: Retrieve data from the backend
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: Data retrieved from the backend
 *       '500':
 *         description: Internal server error    
*/
app.get('/api/data', (req, res) => {
  const responseData = storedData || null; 
  if (!storedData) {
    storedData = null; 
  }

  res.json(responseData); 
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
