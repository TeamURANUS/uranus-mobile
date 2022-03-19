export function getTitleStyle({showClasses}) {
  return {
    classContainerTitle: {
      color: showClasses ? '#2994ff' : 'rgba(185,185,185,0.6)',
      fontSize: 30,
      margin: '3%',
    },
    communityContainerTitle: {
      color: !showClasses ? '#2994ff' : 'rgba(185,185,185,0.6)',
      fontSize: 30,
      margin: '3%',
    },
  };
}
