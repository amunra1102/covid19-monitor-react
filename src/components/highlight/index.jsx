import { Card, Grid } from '@material-ui/core';
import React from 'react';

import HighLightCard from './highline-card';

const HighLight = ({ summary }) => {

    return (
        <Grid container spacing={3}>
            {
                summary.map((data, index) => (
                    <Grid item sm={4} xs={12} key={index}>
                        <Card>
                            <HighLightCard
                                title={data.title}
                                count={data.count}
                                type={data.type}
                            />
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    );
};

export default HighLight;
