const container = { container : true };

const FlexOption = {
    start       : "flex-start",
    center      : "center",
    end         : "flex-end",
    stretch     : "stretch",
    baseline    : "baseline"  
}

const FlexDirection = {1 : "row", 2: "column"};

const GridLayout = {

    /*
    (container, direction="row" justify="center" alignItems="center") = contRowCenterCenter  
    Grid Row with alignments for entire app 
    */
    contRowStartCenter     :   {
        ...container,
        direction       :   FlexDirection[1],
        justify         :   FlexOption.start,
        alignItems      :   FlexOption.center
    },
    contRowCenterCenter     :   {
        ...container,
        direction       :   FlexDirection[1],
        justify         :   FlexOption.center,
        alignItems      :   FlexOption.center
    },
    contRowEndCenter     :   {
        ...container,
        direction       :   FlexDirection[1],
        justify         :   FlexOption.end,
        alignItems      :   FlexOption.center
    },

    /*
    (container, direction="column" justify="center" alignItems="center") = contColCenterCenter  
    Grid Row with alignments for entire app 
    */    
    contColStartCenter     :   {
        ...container,
        direction       :   FlexDirection[2],
        justify         :   FlexOption.start,
        alignItems      :   FlexOption.center
    },
    contColCenterCenter     :   {
        ...container,
        direction       :   FlexDirection[2],
        justify         :   FlexOption.center,
        alignItems      :   FlexOption.center
    },
    contColEndCenter     :   {
        ...container,
        direction       :   FlexDirection[2],
        justify         :   FlexOption.end,
        alignItems      :   FlexOption.center
    }
}

export default GridLayout;