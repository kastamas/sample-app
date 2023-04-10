interface ITransformConfig {
  initialValue: number;
  lastValue: number;
  newInitialValue: number;
  newLastValue: number;
}

const buildTransform =
  ({
    initialValue,
    lastValue,
    newLastValue,
    newInitialValue,
  }: ITransformConfig) =>
  (value) => {
    const step = 0.001;
    const stepsAmount = (lastValue - initialValue) / step;
    const newStep = (newLastValue - newInitialValue) / stepsAmount;

    const currentStep = (value - initialValue) / step;
    const offset = currentStep * newStep;

    return newInitialValue + offset;
  };

const transform = buildTransform({
  initialValue: 0,
  lastValue: 1,
  newInitialValue: 0.5,
  newLastValue: 1,
});
export const buildRgbColor = (offset: number) => {
  const colorSegment = offset * 255;

  return `rgba(${colorSegment}, ${colorSegment}, ${colorSegment}, ${transform(
    offset
  )})`;
};

const invertedTransform = buildTransform({
  initialValue: 0,
  lastValue: 1,
  newInitialValue: 1,
  newLastValue: 0.5,
});
export const buildInvertedRgbColor = (offset: number) => {
  const colorSegment = 255 * (1 - offset);

  return `rgba(${colorSegment}, ${colorSegment}, ${colorSegment}, ${invertedTransform(
    offset
  )})`;
};
