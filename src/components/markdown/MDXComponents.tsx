import * as React from 'react';
import ScriptTag from 'react-script-tag';
import Asterisk from '../Tooltip/Asterisk';
import TextTooltip from '../Tooltip/TextTooltip';
import FocusProblem from './FocusProblem';
import HTMLComponents from './HTMLComponents';
import { IncompleteSection } from './IncompleteSection';
import Info from './Info';
import {
  CPPSection,
  JavaSection,
  LanguageSection,
  PySection,
} from './LanguageSection';
import Optional from './Optional';
import Example3DComponent from './p5/Example3DComponent';
import PrefixSumInteractive from './PrefixSumInteractive';
import { DivisionList } from './ProblemsList/DivisionList/DivisionList';
import { ProblemsList } from './ProblemsList/ProblemsList';
import Processing from './Processing';
import Quiz from './Quiz';
import { Resource, ResourcesList } from './ResourcesList';
import Spoiler from './Spoiler';
import UploadFile from './UploadFile';
import Warning from './Warning';
import Youtube from './Youtube';

const MATHDIV = props => {
  return (
    <div
      className={props.className}
      data-latex={`$$${props.latex}$$`}
      dangerouslySetInnerHTML={{ __html: props.children }}
    />
  );
};
const MATHSPAN = props => {
  return (
    <span
      className={props.className}
      data-latex={`$${props.latex}$`}
      dangerouslySetInnerHTML={{ __html: props.children }}
    />
  );
};

export const components = {
  Spoiler,
  Info,
  Warning,
  Optional,
  Problems: ProblemsList,
  FocusProblem,
  Resources: ResourcesList,
  DivisionList,
  Resource,
  TextTooltip,
  LanguageSection,
  CPPSection,
  JavaSection,
  PySection,
  IncompleteSection,
  Asterisk,
  Youtube,
  PrefixSumInteractive,
  Quiz,
  MATHDIV,
  Processing,
  MATHSPAN,
  UploadFile,
  Example3DComponent,
  ScriptTag,

  ...HTMLComponents,
};
