import { useState } from 'react';
import CardDataSale from './CardDataSale';
import fetchData from '../Functions/FetchData';


import { Button, Box, ListItem, ListItemText, AppBar, Toolbar, IconButton, Typography } from '@mui/material';


function MainPage() {
  const [data, setData] = useState([]);

  const callData = async () => {
    try {
      const result = await fetchData('https://uniformes.newpace.com.br/wp-json/wc/v3/orders?status=processing', {
        headers: {
          'Authorization': 'Basic ' + btoa(`${import.meta.env.VITE_CONSUMER_KEY}:${import.meta.env.VITE_CONSUMER_SECRET}`)
        },
      });
      const transformedData = transformOrderData(result);
      setData(transformedData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  function transformOrderData(orders) {
    return orders.map(order => {
      const nome = `${order.billing.first_name} ${order.billing.last_name}`;
      const id = order.id
      const entregue = false
      const pedido = order.line_items.map(item => ({
        item: item.name,
        quantidade: item.quantity
      }));
      return { nome, pedido, id, entregue };
    });
  }

  return (
    <>
    <Box maxWidth="xxl" sx={{ flexGrow: 1, width: '100vw', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pedidos
          </Typography>
        </Toolbar>
      </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => theme.palette.grey[100],
            height: '100%',
            overflow: 'auto',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
          }}
        >
          <Box>

        <Button onClick={callData}>
          Click me
        </Button>
          <CardDataSale data={data}/>
        </Box>
        </Box>
      </Box>
    </>
  );
}

export default MainPage;
