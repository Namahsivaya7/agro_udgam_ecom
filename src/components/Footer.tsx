import { SITE_DESCRIPTION, appLogo, appName } from "@/utils/config";
import {
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  TwitterOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import { Col, Divider, Flex, Layout, Row, Typography, Image } from "antd";
import Link from "next/link";

import React from "react";

function FooterLink({ name, href }: { name: string; href: string }) {
  return (
    <Link href={href}>
      <Typography style={{ color: "gray", fontSize: 15 }}>{name}</Typography>
    </Link>
  );
}

export default function Footer() {
  return (
    <Layout.Footer>
      <Row className="footerstyle" gutter={[32, 32]}>
        <Col xs={24} md={12} xl={12}>
          <Flex vertical>
            <Flex align="center">
              <Image
                alt={appName}
                src={appLogo}
                width={40}
                height={40}
                preview={false}
              />
              <Typography style={{ fontFamily: "sans-serif", fontSize: 20 }}>
                {appName}
              </Typography>
            </Flex>

            <Typography.Text type="secondary">
              {SITE_DESCRIPTION}
            </Typography.Text>
          </Flex>
        </Col>
        <Col xs={24} md={12} xl={4}>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={12} lg={24}>
              <Flex vertical>
                <FooterLink name="About Us" href="https://www.trisandya.com" />
                <FooterLink name="Become a supplier" href="#" />
                <FooterLink name="Hall of Fame" href="#" />
                <FooterLink name="Sitemap" href="#" />
              </Flex>
            </Col>
            <Col xs={24} sm={12} md={12} lg={24}>
              <Flex vertical>
                <FooterLink name="Legal and Policies" href="/privacy" />
                <FooterLink name="Trisandya Tech Blog" href="#" />
                <FooterLink name="Notices and Returns" href="#" />
              </Flex>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={12} xl={4}>
          <Flex vertical>
            <Typography style={{ fontSize: 20 }}>Reach out to us</Typography>
            <Flex
              style={{
                display: "Flex",
                justifyContent: "space-between",
              }}
            >
              <Link href="https://www.facebook.com/trisandyatech">
                <FacebookFilled style={{ color: "blue", fontSize: 30 }} />
              </Link>
              <Link
                href="https://www.instagram.com/trisandyatech"
                target="_blank"
              >
                <InstagramFilled style={{ color: "purple", fontSize: 30 }} />
              </Link>
              <Link
                href="https://www.youtube.com/trisandyatech"
                target="_blank"
              >
                <YoutubeFilled style={{ color: "red", fontSize: 30 }} />
              </Link>
              <Link
                href="https://in.linkedin.com/trisandyatech"
                target="_blank"
              >
                <LinkedinFilled style={{ color: "blue", fontSize: 30 }} />
              </Link>
              <Link
                href="https://www.twitter.com/trisandyatech"
                target="_blank"
              >
                <TwitterOutlined style={{ color: "skyblue", fontSize: 30 }} />
              </Link>
            </Flex>
          </Flex>
        </Col>
        <Col xs={24} md={12} xl={4}>
          <Flex vertical>
            <Typography style={{ color: "gray" }}>
              <Typography>
                <b>Trisandya Technology Solutions Pvt. Ltd</b>
              </Typography>
              <Typography>
                DNO: 3-13A, Jammichettu Center, Pedakallepalli, AP, India -
                521130
              </Typography>
              <Typography>
                <a href="mailto:office@trisandya.com">
                  [office]@[trisandya].[com]
                </a>
              </Typography>
              <Typography>© 2024 Trisandya.com</Typography>
            </Typography>
          </Flex>
        </Col>
      </Row>
    </Layout.Footer>
  );
}
