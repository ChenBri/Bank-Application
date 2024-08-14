import { CardContent, CardHeader } from '@mui/material';
import Card from '@mui/material/Card';

export default function App({ balance }: { balance: number }) {
    let email = sessionStorage.getItem('email');
    return (

        <Card className='h-full'>
            <CardHeader title="Balance" subheader={`Email: ${email}`} />
            <div className=" flex flex-col align-middle">

            <CardContent className="text-center text-3xl border-2 my-4 md:mx-12 rounded-2xl animate-pulse">{balance}</CardContent>
            </div>
        </Card>

    );
}

