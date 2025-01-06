import express from 'express';
import cors from "cors"
import { loginRouter } from './routes/loginRoutes';
import { employeedataRouter } from './routes/EmployeedataRoutes';

const app = express();
app.use(cors())
const port = 3000;

app.use(express.json());
app.use('/',loginRouter)
app.use('/',employeedataRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
