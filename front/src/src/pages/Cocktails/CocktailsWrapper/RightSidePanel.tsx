import { Calendar, Col, Radio, Row, Select, Typography } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import dayLocaleData from 'dayjs/plugin/localeData';
import { CarouselCocktails } from './CarouselCocktails/CarouselCocktails';

export default function RightSidePanel() {
  dayjs.extend(dayLocaleData);

  return (
    <>
      <div
        className='right-side-panel'
        style={{
          width: '25%',
        }}
      >
        <div
          className='slider-carousel'
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            flexWrap: 'wrap',
            margin: 5,
          }}
        >
          <h1 style={{ fontSize: 14, margin: 5 }}>Top-8 most popular cocktails</h1>
          <CarouselCocktails />
        </div>
        <div
          className='site-calendar-customize-header-wrapper'
          style={{
            margin: 5,
          }}
        >
          <Calendar
            fullscreen={false}
            headerRender={({ value, type, onChange, onTypeChange }) => {
              const start = 0;
              const end = 12;
              const monthOptions = [];

              let current = value.clone();
              const localeData = value.localeData();
              const months = [];
              for (let i = 0; i < 12; i++) {
                current = current.month(i);
                months.push(localeData.monthsShort(current));
              }

              for (let i = start; i < end; i++) {
                monthOptions.push(
                  <Select.Option key={i} value={i} className='month-item'>
                    {months[i]}
                  </Select.Option>
                );
              }

              const year = value.year();
              const month = value.month();
              const options = [];
              for (let i = year - 10; i < year + 10; i += 1) {
                options.push(
                  <Select.Option key={i} value={i} className='year-item'>
                    {i}
                  </Select.Option>
                );
              }
              return (
                <div style={{ padding: 8 }}>
                  <Typography.Title level={4}>
                    Let's see when you can taste some drinks!
                  </Typography.Title>
                  <Row gutter={8}>
                    <Col>
                      <Radio.Group
                        size='small'
                        onChange={(e) => onTypeChange(e.target.value)}
                        value={type}
                      >
                        <Radio.Button value='month'>Month</Radio.Button>
                        <Radio.Button value='year'>Year</Radio.Button>
                      </Radio.Group>
                    </Col>
                    <Col>
                      <Select
                        size='small'
                        dropdownMatchSelectWidth={false}
                        className='my-year-select'
                        value={year}
                        onChange={(newYear) => {
                          const now = value.clone().year(newYear);
                          onChange(now);
                        }}
                      >
                        {options}
                      </Select>
                    </Col>
                    <Col>
                      <Select
                        size='small'
                        dropdownMatchSelectWidth={false}
                        value={month}
                        onChange={(newMonth) => {
                          const now = value.clone().month(newMonth);
                          onChange(now);
                        }}
                      >
                        {monthOptions}
                      </Select>
                    </Col>
                  </Row>
                </div>
              );
            }}
          />
        </div>
      </div>
    </>
  );
}
