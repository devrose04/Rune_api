process.on('unhandledRejection', (data) => {
  console.log('Unhandled Rejection\n', data);
  process.exit(1);
});

export * from './add';
