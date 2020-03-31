export const VOTING_TYPE = {
  FIBONACCI: 0,
  TSHIRT: 1
};

export function getDisplayValue(type, value) {
  let vote = choices[type].find(choice => {
    return choice.value === value;
  });

  return (vote && vote.label) || undefined;
}

export const choices = {
  [VOTING_TYPE.TSHIRT]: [
    {
      value: '?',
      label: '?'
    },
    {
      value: 1,
      label: 'XS'
    },
    {
      value: 2,
      label: 'S'
    },
    {
      value: 3,
      label: 'M'
    },
    {
      value: 4,
      label: 'L'
    },
    {
      value: 5,
      label: 'XL'
    },
    {
      value: 6,
      label: 'XXL'
    }
  ],
  [VOTING_TYPE.FIBONACCI]: [
    {
      value: '?',
      label: '?'
    },
    {
      value: 1
    },
    {
      value: 2
    },
    {
      value: 3
    },
    {
      value: 5
    },
    {
      value: 8
    },
    {
      value: 13
    },
    {
      value: 21
    },
    {
      value: 34
    },
    {
      value: 55
    },
    {
      label: '∞',
      value: '∞'
    }
  ]
};
