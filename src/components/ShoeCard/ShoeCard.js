import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const VARIANTS_CONSTANTS = {
    "on-sale": {
      label: "Sale",
      backgroundColor: COLORS.primary,
    },
    "new-release": {
      label: "Just Released!",
      backgroundColor: COLORS.secondary,
    },
  };

  const variantContent = VARIANTS_CONSTANTS[variant];
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variantContent && (
            <Variant content={variantContent}>{variantContent.label} </Variant>
          )}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price color={salePrice ? COLORS.gray[700] : COLORS.gray[900]}>
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {salePrice && (
            <Price color={COLORS.primary}>{formatPrice(salePrice)}</Price>
          )}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 340px;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Variant = styled.span`
  position: absolute;
  right: -4px;
  top: 12px;
  padding: 8px 10px;
  border-radius: 2px;
  font-weight: 700;
  color: ${COLORS.white};
  background-color: ${(props) => props.content.backgroundColor};
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${(props) => props.color};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
