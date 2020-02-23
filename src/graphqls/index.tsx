import { gql } from '@apollo/client';

export const VIEWER = gql`{
    viewer {
        _id
        name
        email 
    }
}`;
