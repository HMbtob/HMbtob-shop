import React from 'react';
import { SpecialOrderHeader } from './SpecialOrderHeader';
import { SpecialOrderRow } from './SpecialOrderRow';

export default function SpecialOrder({ user, exchangeRate }: any) {
  return (
    <div>
      <SpecialOrderHeader />
      <SpecialOrderRow user={user} exchangeRate={exchangeRate} />
    </div>
  );
}
