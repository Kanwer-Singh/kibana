/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiAccordion, EuiFlexGroup, EuiSpacer, EuiTitle, useGeneratedHtmlId } from '@elastic/eui';
import type { VFC } from 'react';
import React from 'react';

export const HEADER_TEST_ID = 'Header';
export const CONTENT_TEST_ID = 'Content';

export interface DescriptionSectionProps {
  /**
   * Boolean to allow the component to be expanded or collapsed on first render
   */
  expanded: boolean;
  /**
   * Title value to render in the header of the accordion
   */
  title: string;
  /**
   * React component to render in the expandable section of the accordion
   */
  children: React.ReactNode;
  /**
   * Prefix data-test-subj to use for the header and expandable section of the accordion
   */
  ['data-test-subj']?: string;
}

/**
 * Component used to render multiple sections in the Overview tab
 * - Description
 * - Investigation
 * - Visualizations
 * - Insights
 */
export const ExpandableSection: VFC<DescriptionSectionProps> = ({
  expanded,
  title,
  children,
  'data-test-subj': dataTestSub,
}) => {
  const accordionId = useGeneratedHtmlId({ prefix: 'accordion' });

  const headerDataTestSub = dataTestSub + HEADER_TEST_ID;
  const contentDataTestSub = dataTestSub + CONTENT_TEST_ID;

  const header = (
    <EuiTitle size="xs" data-test-subj={headerDataTestSub}>
      <h4>{title}</h4>
    </EuiTitle>
  );

  return (
    <EuiAccordion id={accordionId} buttonContent={header} initialIsOpen={expanded}>
      <EuiSpacer size="m" />
      <EuiFlexGroup gutterSize="none" direction="column" data-test-subj={contentDataTestSub}>
        {children}
      </EuiFlexGroup>
    </EuiAccordion>
  );
};

ExpandableSection.displayName = 'ExpandableSection';
