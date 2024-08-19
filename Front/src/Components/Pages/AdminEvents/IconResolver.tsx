import React from 'react';
import * as Icons from '@mui/icons-material';

type IconName = keyof typeof Icons;

interface IconResolverProps extends React.SVGProps<SVGSVGElement> {
  iconName: IconName;
}

const IconResolver: React.FC<IconResolverProps> = ({ iconName, ...props }) => {

  const IconComponent = Icons[iconName] as React.ComponentType<React.SVGProps<SVGSVGElement>>;

  if (!IconComponent) {
    console.error(`Icon "${iconName}" not found`);
    return null;
  }
  return <IconComponent {...props} />;
};

export default IconResolver;
