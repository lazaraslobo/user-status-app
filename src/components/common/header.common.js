import React from 'react';
import Grid from '../common/grid.common';
import GridOptions from '../maps/grid-layout.map';

const headerComp = (headerProps) =>{
    return(
        <Grid {...GridOptions.contRowCenterCenter} item xs={12} className="common-header">
            <Grid item {...GridOptions.contRowCenterCenter} xs={9}>
                <h2>{headerProps.title}</h2>
                <h1>HERE {console.log("ENV ", process.env)}</h1>
            </Grid>
            <Grid item {...GridOptions.contRowCenterCenter} xs={1}>
                {headerProps.children}
            </Grid>
        </Grid>
    )
}

export default headerComp;