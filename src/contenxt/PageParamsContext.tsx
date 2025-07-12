import React, { createContext, useContext, useState } from 'react';

interface PageParams {
  page: number;
  pageSize: number;
  totalCount: number;
}

const defaultValue: PageParams = {
  page: 1,
  pageSize: 10,
  totalCount: 0,
};

export const PageParamsContext = createContext<{
  pageParams: PageParams;
  setPageParams: React.Dispatch<React.SetStateAction<PageParams>>;
}>({
  pageParams: defaultValue,
  setPageParams: () => {},
});

export const PageParamsProvider = ({ children }: { children: React.ReactNode }) => {
  const [pageParams, setPageParams] = useState<PageParams>(defaultValue);

  return (
    <PageParamsContext.Provider value={{ pageParams, setPageParams }}>
      {children}
    </PageParamsContext.Provider>
  );
};

export const usePageParams = () => useContext(PageParamsContext);
