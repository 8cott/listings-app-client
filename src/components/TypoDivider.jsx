import { Typography, Divider } from '@mui/material';

const TypoDivider = ({ variant, children }) => {
  return (
    <>
      <Typography 
        gutterBottom
        variant={variant}
        component='div'>
        {children}
      </Typography>
      <Divider />
    </>
  );
};

export default TypoDivider;
