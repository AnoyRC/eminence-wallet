import { Typography, Button, CardFooter } from '@material-tailwind/react';

const TransactionFooter = () => {
  return (
    <CardFooter className="flex items-center justify-between border-t border-white p-4">
      <Typography variant="small" color="white" className="font-normal">
        Page 1 of 10
      </Typography>

      <div className="flex gap-2">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </div>
    </CardFooter>
  );
};
export default TransactionFooter;
