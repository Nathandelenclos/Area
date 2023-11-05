import React from 'react';
import { it, describe, expect } from '@jest/globals';
import { render } from '@testing-library/react-native';
import ViewContainer from '@components/ViewContainer';
import { Text, View } from 'react-native';

describe('ViewContainer component', () => {
  it('renders correctly with child and default background', () => {
    const { getByText, toJSON } = render(
      <ViewContainer>
        <Text>Child Text</Text>
      </ViewContainer>
    );

    // Vérifie que le composant ViewContainer a correctement rendu l'enfant.
    expect(getByText('Child Text')).toBeTruthy();
  });

  it('renders correctly with children and custom background', () => {
    const { getByText, toJSON } = render(
      <ViewContainer background="red">
        <Text>Child Text</Text>
        <View style={{backgroundColor:'red'}}></View>
      </ViewContainer>
    );

    // Vérifie que le composant ViewContainer a correctement rendu l'enfant.
    expect(getByText('Child Text')).toBeTruthy();
  });
});
