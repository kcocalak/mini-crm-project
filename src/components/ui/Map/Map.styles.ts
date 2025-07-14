import styled from 'styled-components';

export const MapContainerStyled = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e9ecef;

  /* Remove underlines from Leaflet zoom controls */
  .leaflet-control-zoom a {
    text-decoration: none !important;
  }
  
  .leaflet-control-zoom a:hover {
    text-decoration: none !important;
  }
  
  .leaflet-control-zoom-in,
  .leaflet-control-zoom-out {
    text-decoration: none !important;
  }
  
  .leaflet-control-zoom-in:hover,
  .leaflet-control-zoom-out:hover {
    text-decoration: none !important;
  }
`;
