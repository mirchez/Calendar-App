import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';

export const CalendarApp = () => {
  return (
    <div>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </div>
  )
}


