// insertion point sub template for components imports 
  import { BarsTableComponent } from './bars-table/bars-table.component'
  import { BarSortingComponent } from './bar-sorting/bar-sorting.component'

// insertion point sub template for map of components per struct 
  export const MapOfBarsComponents: Map<string, any> = new Map([["BarsTableComponent", BarsTableComponent],])
  export const MapOfBarSortingComponents: Map<string, any> = new Map([["BarSortingComponent", BarSortingComponent],])

// map of all ng components of the stacks
export const MapOfComponents: Map<string, any> =
  new Map(
    [
      // insertion point sub template for map of components 
      ["Bar", MapOfBarsComponents],
    ]
  )

// map of all ng components of the stacks
export const MapOfSortingComponents: Map<string, any> =
  new Map(
    [
    // insertion point sub template for map of sorting components 
      ["Bar", MapOfBarSortingComponents],
    ]
  )
