process.on('unhandledRejection', (data: any) => {
  console.log('Unhandled Rejection\n', data);
  process.exit(1);
});

export * from './add';
