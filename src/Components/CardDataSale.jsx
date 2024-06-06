import { Card, CardContent, Checkbox, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function CardDataSale({ data }) {

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {data.length > 0 && (
        <>
          {data.map((order, index) => (
            <Grid key={index} item xs={2} sm={4} md={4}>
              <Card>
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography component="p">
                      {order.id}
                    </Typography>
                    <Checkbox />
                  </Stack>
                  <Typography variant="h5" component="div">
                    {order.nome}
                  </Typography>
                  {order.pedido.map((item, idx) => (
                    <span key={idx}>
                      {item.item} x {item.quantidade}<br />
                    </span>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}

CardDataSale.propTypes = {
  data: PropTypes.array.isRequired
}

export default CardDataSale;
