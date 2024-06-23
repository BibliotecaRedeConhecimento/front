import { React, useEffect, useState } from "react";

import PageContainer from "../../components/PageContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import PageContentContainer from "../../components/PageContentContainer";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";

import { IoIosArrowBack } from "react-icons/io";
import { TfiMenuAlt } from "react-icons/tfi";

import { getAllNeedsReviewKnowledges } from "../../servicesBack/KnowledgeServices";

import ButtonComponent from "../../components/ButtonBack";
import TableReviewKnowledge from "../../components/TableReviewKnowledge";

function ReviewKnowledge({
    HandledarkMode,
    isDarkMode,
    decreaseFontSize,
    increaseFontSize,
    logOut,
}) {

    const [knowledgeData, setKnowledgeData] = useState([])

    const fetchKnowledges = async () => {
        const response = await getAllNeedsReviewKnowledges()
        setKnowledgeData(response.data.content)
        console.log(response.data.content)
    }

    useEffect(() => {
        fetchKnowledges()
    }, [])

    return (
        <ContainerWithSidebar
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
            HandledarkMode={HandledarkMode}
            isDarkMode={isDarkMode}
            logOut={logOut}
        >
            <PageContainer>
                <PageHeaderContainer
                    icon={<TfiMenuAlt style={{ width: 34, marginRight: 15 }} />}
                    title={`Revisar Conhecimentos`}
                    buttonback={
                        <ButtonComponent
                            size="8rem"
                            //bgColor="var(--cinza-primario)"
                            textColor="white"
                            alternativeText="Voltar"
                        ></ButtonComponent>
                    }
                />
                <PageContentContainer>

                    <TableReviewKnowledge knowledge={knowledgeData} />

                    <div style={{ marginTop: 20 }}>
                        <ButtonComponent
                            size="10rem"
                            bgColor="var(--cinza-primario)"
                            textColor="white"
                            alternativeText="Voltar">
                            <IoIosArrowBack style={{ marginRight: 5, width: 12 }} />
                            Voltar</ButtonComponent>
                    </div>


                </PageContentContainer>
            </PageContainer>
        </ContainerWithSidebar>
    );
}

export default ReviewKnowledge;